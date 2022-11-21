# SYMUNITY レンタルカタログシステム

## バージョン管理
|Date|Version|内容|
|:--:|:--:|:---|
|2022/07/20|v1.0.0|レンタルカタログシステム リリース|
|2022/08/17|v1.1.0|・QRコード資料ダウンロードページの追加<br>・スクリーンカテゴリーの追加<br>・機材名と型番をコピー(右クリックできるように変更)|
|2022/08/22|v1.1.1|・掛け率表示の修正<br>・ブレイクポイント(小数点)を追加|


### nodejs のバージョン `v16.13.0`

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## git の運用方法

### 各ブランチについて

```bash
# master：
大元。一番上の親となるブランチ。
本番環境のリソースはこのブランチのリソースと一致する。

# develop：
開発用ブランチ。featureブランチはすべてここにマージされる。
このブランチは複数切らず、案件開始時に一回のみ切るブランチ。

# feature：
各機能ごとに作るブランチ。
よくfutureと間違えて「フューチャー」と読む方がいるが、正しい読み方は「フィーチャー」。
複数切るブランチになるのため「feature/機能名」のようにする。

#release：
リリース用ブランチ。段階リリースを行う場合に作成するブランチ。
複数切るブランチになるため「release/リリース日」のようにする。

#hotfix：
バグ修正用ブランチ。バグ修正が必要になった場合に一時的に作成するブランチ。
複数切るブランチになるため「hotfix/バグ名」のようにする。
```

### 運用手順

```
1. masterからdevelopを切る。
2. masterからreleaseを切る。
3. developからfeatureを切る。（機能ごとにブランチを切るので、複数のfeatureを切ることがほとんど）
4. feature内で作業し、変更内容をdevelopにマージ。
5. 全てのfeatureをdevelopにマージできたら、developをreleaseにマージ。
6. releaseを本番環境にデプロイして、問題が無ければreleaseをmasterにマージ。
7. masterをdevelopにマージ。
8. 本番運用中にバグが発生した場合は、masterからhotfixを切る。
9. hotfixでバグ修正を行い、hotfixをデプロイ。
10. 問題なければhotfixをmasterにマージ。
11. masterをdevelopにマージ。
12. 次のリリースに向けてmasterからreleaseを切る。
13. 以降、3番の手順に戻って繰り返し。
```

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
