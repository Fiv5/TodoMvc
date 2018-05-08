# TodoMvc

仿照[taste/todomvc](https://github.com/tastejs/todomvc), 使用 vue、react 分别重构的小应用；可以增删改 todo，按照状态进行展示，并使用 HTML5 的 historyAPI 把状态反映到地址上；运用 localstorage 进行数据存储。

## Run

```bash
git clone https://github.com/Fiv5/TodoMvc
cd TodoMvc/<*-todomvc>
npm install
npm start
```

## 有何不同

采用 vuex 和 redux 进行状态管理（用于练手，实际上小应用采用状态管理库反而增加复杂度）；以工程化方式进行搭建（webpack，babel）
