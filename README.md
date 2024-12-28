# dont-fxxk-my-clipboard
阻止某些网站向剪贴板里拉屎

正常来说这不会拦截到用户的复制操作，不过总会有意外情况，大概

### 安装

首先你需要一个脚本管理器。虽然tampermonkey很流行，不过我个人推荐使用[ViolentMonkey](https://violentmonkey.github.io/)。这个脚本应该不挑管理器，选择你喜欢的就好

安装完管理器后，点击下面的链接即可安装

[Github](https://github.com/KoishiMoe/dont-fxxk-my-clipboard/raw/refs/heads/main/dfmc.user.js) 能正常访问github的推荐使用

[jsdelivr](https://cdn.jsdelivr.net/gh/KoishiMoe/dont-fxxk-my-clipboard@master/dfmc.user.min.js) 不能正常访问github的请使用这个


### 网站适配

我一般只关注自己常用的网站，因此默认设置下只会包含这些。如果需要添加你自己常用的网站，请直接修改脚本管理器中，该脚本的`@match`设置

大部分网站向剪贴板拉屎的方法比较统一，因此自带的拦截方式应当能应对大部分情况。如果你发现在某个特定网站不工作，可以开个issue来讨论
