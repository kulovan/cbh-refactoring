const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    if (!event) return TRIVIAL_PARTITION_KEY;
    if (!event.partitionKey) return generateSHA3Hash(JSON.stringify(event));

    const candidate = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey;
    return candidate.length > MAX_PARTITION_KEY_LENGTH ? generateSHA3Hash(candidate) : candidate;
};

const generateSHA3Hash = (stringInput) => {
    return crypto.createHash("sha3-512").update(stringInput).digest("hex");
}
