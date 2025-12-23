document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("generateBtn")
    .addEventListener("click", generateBatch);
});

function generateBatch() {
  const count = Number(document.getElementById("count").value);
  const tbody = document.getElementById("result");
  tbody.innerHTML = "";

  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io"
  });

  for (let i = 0; i < count; i++) {
    // 1️⃣ 用 ethers 生成私钥
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey.replace("0x", "");

    // 2️⃣ 私钥 → 真 TRON 地址
    const tronAddress = tronWeb.address.fromPrivateKey(privateKey);

    // 3️⃣ 渲染
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${tronAddress}</td>
      <td>${wallet.privateKey}</td>
    `;
    tbody.appendChild(tr);
  }
}
