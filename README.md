# [Start Bootstrap](http://startbootstrap.com/) - [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/)

[kemsakurai/mezzanine-theme-clean-blog: Clean Blog based theme for Mezzanine CMS used by](https://github.com/kemsakurai/mezzanine-theme-clean-blog) の `bootstrap.css`、`fontawesome.css` の最適化のため、`startbootstrap-clean-blog-3.3.7` を ダウンロードして保持。

------------------------------
## CSS のビルド方法       

* リポジトリのクローン    
```console
git clone https://github.com/kemsakurai/startbootstrap-clean-blog-3.3.7.git
```

* ディレクトリ移動   
```console
cd startbootstrap-clean-blog-3.3.7/
```

* npm install
```console
npm install
```

* gulp タスク実行     
```console
npm run optimize-bootstrap     
npm run optimize-font-awesome    
```

* 出力されるCSS    
```console
ls -1 ./vendor/bootstrap/css
bootstrap.css
bootstrap.min.css
bootstrap.optimized.css < this
```
```console
ls -1 ./vendor/font-awesome/css
font-awesome.css
font-awesome.min.css
font-awesome.optimized.css < this
```

------------------------------
## LICENSE

Copyright 2013-2016 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-clean-blog/blob/gh-pages/LICENSE) license.
