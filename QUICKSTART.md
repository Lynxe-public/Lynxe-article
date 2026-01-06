# 快速开始指南

## 3 步完成部署

### 1. 安装依赖

```bash
npm install
```

### 2. 配置已就绪

配置已经设置为 `Lynxe-public/Lynxe-article`，无需修改。

### 3. 推送到 GitHub

```bash
git add .
git commit -m "Setup VitePress blog"
git push origin main
```

然后在 GitHub 仓库设置中：
- Settings → Pages → Source: **GitHub Actions**

完成！你的网站会自动部署到：`https://Lynxe-public.github.io/Lynxe-article/`

## Google 索引（可选但推荐）

1. 访问 https://search.google.com/search-console
2. 添加网站：`https://Lynxe-public.github.io/Lynxe-article/`
3. 验证所有权（HTML 标签方式）
4. 提交 sitemap：`https://Lynxe-public.github.io/Lynxe-article/sitemap.xml`

详细说明请查看 [SETUP.md](./SETUP.md)

