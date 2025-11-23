const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const { pipeline } = require("@xenova/transformers");

let model = null;

async function loadModel() {
  if (!model) {
    model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Text similarity model loaded");
  }
}

function extractVector(embeddingOutput) {
  let data = embeddingOutput;
  if (
    embeddingOutput &&
    typeof embeddingOutput === "object" &&
    embeddingOutput.data !== undefined
  )
    data = embeddingOutput.data;
  if (ArrayBuffer.isView(data)) return Array.from(data);
  if (Array.isArray(data)) {
    const flat = data.flat ? data.flat(Infinity) : flattenDeep(data);
    return flat.map((v) => (typeof v === "number" ? v : Number(v) || 0));
  }
  try {
    return Array.from(data);
  } catch (e) {
    return [];
  }
}

function flattenDeep(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}

// Cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
  const n = Math.min(vecA.length, vecB.length);
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < n; i++) {
    const a = Number(vecA[i]) || 0;
    const b = Number(vecB[i]) || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

// Matching lost and found items
exports.matchWithCLIP = async (req, res) => {
  try {
    await loadModel();

    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    if (!lostItems.length || !foundItems.length) {
      return res.json({ message: "No items to match", matches: [] });
    }

    const results = [];
    const NAME_SIM_THRESHOLD = 0.5;
    const TEXT_SIM_THRESHOLD = 0.4;
    const BOOST_FACTOR = 0.1;
    const NAME_WEIGHT = 0.6;
    const TEXT_WEIGHT = 0.4;
    const HIGH_CONF_THRESHOLD = 70;

    for (const lost of lostItems) {
      const lostName = lost.itemName || "";
      const lostText = [
        lost.itemDescription,
        lost.itemCategory,
        lost.identificationMark,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const lostVec = extractVector(
        await model(lostText, { pooling: "mean", normalize: true })
      );
      const lostNameVec = extractVector(
        await model(lostName, { pooling: "mean", normalize: true })
      );

      const boostWords = (lost.identificationMark || "")
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean);

      for (const found of foundItems) {
        const foundName = found.itemName || "";
        const foundText = (found.itemDescription || "").toLowerCase();

        const foundNameVec = extractVector(
          await model(foundName, { pooling: "mean", normalize: true })
        );

        const nameScore = cosineSimilarity(lostNameVec, foundNameVec);
        if (nameScore < NAME_SIM_THRESHOLD) continue;

        const foundTextVec = extractVector(
          await model(foundText, { pooling: "mean", normalize: true })
        );
        let textScore = cosineSimilarity(lostVec, foundTextVec);

        const matches = boostWords.filter((word) => foundText.includes(word));
        if (matches.length > 0) {
          textScore += BOOST_FACTOR * matches.length;
          if (textScore > 1) textScore = 1;
        }

        let finalScore = nameScore * NAME_WEIGHT + textScore * TEXT_WEIGHT;

        const nameScorePercent = Math.round(nameScore * 100);
        const textScorePercent = Math.round(textScore * 100);
        const finalScorePercent = Math.round(finalScore * 100);

        if (finalScorePercent > TEXT_SIM_THRESHOLD * 100) {
          results.push({
            lostItem: lost,
            foundItem: found,
            finalScore: finalScorePercent,
            nameScore: nameScorePercent,
            textScore: textScorePercent,
            boostWordsMatched: matches,
            highConfidence: finalScorePercent >= HIGH_CONF_THRESHOLD,
          });
        }
      }
    }

    results.sort((a, b) => b.finalScore - a.finalScore);

    return res.json({ message: "Matching complete", matches: results });
  } catch (err) {
    console.error("TEXT MATCH ERROR:", err);
    return res.status(500).json({
      message: "Text similarity model failed",
      error: err.message || err.toString(),
    });
  }
};
