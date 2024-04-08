document.addEventListener('DOMContentLoaded', loadMemos);
document.getElementById('saveButton').addEventListener('click', saveMemo);

async function saveMemo() {
    var memoText = document.getElementById('memoInput').value;
    if (memoText) {
        var password = "your-encryption-key"; // 実際のアプリではユーザー入力などから取得
        var encryptedMemo = await encryptText(memoText, password);
        
        var memos = JSON.parse(localStorage.getItem('memos')) || [];
        memos.push(encryptedMemo);
        localStorage.setItem('memos', JSON.stringify(memos));
        
        addMemoToDOM(memoText); // ユーザーには暗号化前のテキストを表示
        document.getElementById('memoInput').value = ''; // 入力フィールドをクリア
    }
}

async function loadMemos() {
    var memos = JSON.parse(localStorage.getItem('memos')) || [];
    var password = "your-encryption-key"; // 同上
    for (let encryptedMemo of memos) {
        var memoText = await decryptText(encryptedMemo, password);
        addMemoToDOM(memoText);
    }
}

// encryptText と decryptText 関数はここに追加

function addMemoToDOM(memoText) {
    // この関数の中身は変更なし
}

function removeMemoFromStorage(memoText) {
    // 復号化されたテキストでフィルタするため、このロジックを修正する必要があるかもしれません
    // 特に、メモを一意に識別できるような仕組み（IDの導入など）を考える必要があります
}
