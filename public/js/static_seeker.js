document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('searchBox');

    if (!searchBox) return; // searchBoxが存在しない場合は処理を終了

    const jsonPath = document.querySelector('script[data-json-path]').getAttribute('data-json-path');

    searchBox.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        if (searchText.trim() === "") {
            document.getElementById('searchResults').innerHTML = "";
            return;
        }

        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                let resultsHTML = "";
                const searchWords = searchText.split(/\s+/); // スペースで区切られた検索ワードを配列に変換

                Object.keys(data).forEach(word => {
                    const keywordLowerCase = word.toLowerCase();
                    // すべての検索ワードがキーワードに含まれるかどうかを確認
                    const isMatch = searchWords.every(searchWord => keywordLowerCase.includes(searchWord));

                    if (isMatch) {
                        resultsHTML += `<a href="${data[word].article.url}">${data[word].article.title}</a><br>`;
                    }
                });
                document.getElementById('searchResults').innerHTML = resultsHTML;
            });
    });
});
