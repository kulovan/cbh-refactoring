const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });

    it("Returns JSON serialized partition key when partitionKey is a string", () => {
        const event = {partitionKey: "testPartitionKey"}
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"testPartitionKey"`);
    });

    it("Returns SHA3 hex when there NO partitionKey.", () => {
        const event = {};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"`);
    });

    it("Returns SHA3 hex when there NO partitionKey.", () => {
        const event = {};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"`);
    });


    it("Returns stringified JSON object when partitionKey is a number", () => {
        const event = {partitionKey: 1};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"1"`);
    });

    it("Returns SHA3 hex when partitionKey is 0", () => {
        const event = {partitionKey: 0};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7"`);
    });


    it("Returns SHA3 hex when event is a string.", () => {
        const event = "testEvent";
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"009e2e97355164e54bdeaaef0e554d12c66c6cfe9292b6843f27a1df15237b6bfffb1e46d4e8a933a97632cce535513b946a30d61a2aacfb1ca93b4ea3ca7199"`);
    });

    it("Returns stringified JSON object when partitionKey is an object.", () => {
        const event = {partitionKey: {testKey: "testField"}};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"{\\"testKey\\":\\"testField\\"}"`);
    });

    it("Returns SHA3 hex when partitionKey is a 257 length string .", () => {
        const event = {partitionKey: generateNLengthString(257)};
        const candidate = deterministicPartitionKey(event);
        expect(candidate).toMatchInlineSnapshot(`"5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785"`);
    });

});

const generateNLengthString = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += "a";
    }
    return result;
};
