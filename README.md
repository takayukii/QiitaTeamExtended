目的
----

Qiita:Teamで書いた投稿を任意のエイリアスにメールしたり、個人のQiitaにコピーし投稿するChrome拡張を作りました。

背景
----

* Qiita:Teamに書いた日報をメールで社内に共有したいが、自動でメールするのにあまり有効な手段がなさそう（メンションで飛ばす場合にうまくいかない時がある模様）。
* 投稿内容によってはQiita:Teamだけでなく社外へ公開したいが、手動で写すのが面倒に感じられる（結果どちらかにしか投稿しなくなる）。

使い方
----

Chrome拡張をインストールするとこのChrome拡張のアイコンがChromeの右上に表示されます。設定を行った後に下記のように、メール共有とQiita投稿が行えるようになります。

![image](https://qiita-image-store.s3.amazonaws.com/939/39813/fddfab98-ab7b-3791-cb66-9f73e66ca15e.png)

#### インストール

下記からインストールします。
https://chrome.google.com/webstore/detail/oommfohdakaaifcnmddhlcdpjfpibigb/publish-delayed?authuser=1

#### 設定

Chrome拡張のオプションを開きます。アイコンを右クリックしオプションを選択します。

![image](https://qiita-image-store.s3.amazonaws.com/939/39813/60e3fa76-a28c-548a-f72f-676a0032a0dd.png)

オプションページでは下記のような情報を設定する必要があります。

![image](https://qiita-image-store.s3.amazonaws.com/939/39813/344a2f77-9d12-2dee-401e-516ebbd5cc6e.png)

#### 注意

Qiita投稿も拡張から行いたい場合は、投稿権限付きのトークンを自分で取得し設定します。下記のページで「個人用アクセストークン」を生成します。read_qiita_teamとwrite_qiitaのスコープが必要です。
https://qiita.com/settings/applications

開発者向け情報
----

技術的には、Vue.js + bower + browserifyを利用しています。
https://github.com/takayukii/QiitaTeamExtended

index.htmlとoptions.htmlで読み込むJavaScriptを其々browserify + debowerifyでbundle化する必要があります。

```
browserify -t debowerify js/index.js -o js/index_bundle.js && browserify -t debowerify js/options.js -o js/options_bundle.js
```
