import { SDJwtInstance } from "@sd-jwt/core";
import { ES256, generateSalt, digest } from "@sd-jwt/crypto-nodejs";
// import { DisclosureFrame } from "@sd-jwt/types";
// import { present } from "@sd-jwt/present"

async function vptest() {
  const { publicKey, privateKey } = await ES256.generateKeyPair();
  console.log(publicKey);
  console.log(privateKey);
  const { publicKey2, privateKey2 } = await ES256.generateKeyPair();
  console.log(publicKey2);
  console.log(privateKey2);
  const sdjwt = new SDJwtInstance({
    signer: await ES256.getSigner(privateKey),
    verifier: await ES256.getVerifier(publicKey),
    signAlg: "ES256",
    hasher: digest,
    hashAlg: "SHA-256",
    saltGenerator: generateSalt,
    kbSigner: await ES256.getSigner(privateKey),
    kbSignAlg: "ES256",
    kbVerifier: await ES256.getVerifier(publicKey),
  });
  const sdjwt2 = new SDJwtInstance({
    verifier: await ES256.getVerifier(publicKey),
    signAlg: "ES256",
    hasher: digest,
    hashAlg: "SHA-256",
    saltGenerator: generateSalt,
    kbSignAlg: "ES256",
    kbVerifier: await ES256.getVerifier(publicKey),
  });

  const claims = {
    iss: "경력 증명서를 발급해주는 회사",
    // iat: new Date().getTime(),
    iat: "1714303504576",
    vct: "https://example.com",
    // id: 'did:example:vcvc123',
    // issuer: 'did:example:issuer456',
    // subject: 'did:example:holder789',
    id: "VC 의 id 인 did",
    issuer: "issuer_did",
    subject: "example_did",
    department: "개발부서",
    position: "대리",
    join: "20221222",
    leave: "20241222",
  };
  const disclosureFrame = {
    _sd: ["department", "position", "join", "leave"],
  };

  const credential = await sdjwt.issue(claims, disclosureFrame);
  console.log(credential);

  const kbPayload = {
    iat: Math.floor(Date.now() / 1000),
    aud: "https://example.com",
    nonce: "DiF0tB2VN-F73cnE3homjL2", // 그냥 아무렇게나 한거..
  };

  const presentationFrame = {
    department: true,
    join: true,
  };
  const presentation = await sdjwt.present(credential, presentationFrame, {
    kb: { payload: kbPayload },
  });
  console.log("\npresentation\n");
  console.log(presentation);

  console.log(await sdjwt2.verify(presentation, ["department"], true));
  // console.log(1<2);
}

vptest();
