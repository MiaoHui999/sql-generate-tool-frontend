# SQL 生成工具

> 填写表单即可一键生成 SQL 和测试用的模拟数据。

前端代码仓库：[https://github.com/wenzhou1616/sql-generate-tool-frontend](https://github.com/wenzhou1616/sql-generate-tool-frontend)

后端代码仓库：[https://github.com/wenzhou1616/sql-generate-tool-backend](https://github.com/wenzhou1616/sql-generate-tool-backend)


## 背景

每次做项目都要建表以及造测试用的模拟数据，假如字段有十几列甚至更多时，要自己手动造一些模拟数据，此时就会显得非常麻烦。

假如有一个工具可以帮我们建表顺便把模拟数据也造了，那就可以减少不必要的麻烦，提高开发效率。

## 项目介绍

SQL 生成工具，通过填写表单可以一键生成建表语句、模拟数据和代码；支持多种导入方式，如果已经有了现成的表，支持导入建表语句，还可以导入Excel表格，还可以通过输入几个字段名自动生成表和数据；支持多种生成模拟数据的规则，比如固定值、随机值、正则表达式、递增，甚至可以指定词库来生成数据；用户可以分享自己设计的表、字段、词库，也可以使用其他用户分享的表、字段、词库；并且还有管理后台。

## 技术栈

### 前端

- React 18
- Umi 4.x
- Ant Design 4.x 组件库
- Ant Design Pro Components 高级组件
- TypeScript 

### 后端

- Spring Boot 2.7.x

- MyBatis Plus 3.5.x

- MySQL

- Redis

- Spring AOP

  依赖库：

- FreeMarker：模板引擎
- Druid：SQL 解析
- datafaker：模拟数据
- Apache Commons Lang3：工具库
- Hutool：工具库
- Gson：Json 解析
- Easy Excel：Excel 导入导出
- Knife4j：接口文档生成

## 系统设计

核心设计思路：任意输入 => 统一 Schema => 任意输出：

![123](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/36f9e3d2-06ee-4ae2-89bc-0021f03871bf)


系统分为以下几个核心模块，各模块职责分明：

1. Schema 构造器：将各种不同的输入源转为统一的 Schema
2. 统一 Schema 定义：本质是一个 Java 类（JSON 配置），用于保存表和字段的信息
3. 生成器：负责根据 Schema 生成数据和代码
4. 共享服务：包括词库、表信息、字段信息共享

> 核心模块的代码都在后端 core 目录下

### Schema 定义

用于保存表和字段的信息，结构如下：

```json
{
  "dbName": "库名",
  "tableName": "test_table",
  "tableComment": "表注释",
  "mockNum": 20,
  "fieldList": [{
    "fieldName": "username",
    "comment": "用户名",
    "fieldType": "varchar(256)",
    "mockType": "随机",
    "mockParams": "人名",
    "notNull": true,
    "primaryKey": false,
    "autoIncrement": false
  }]
}
```

### Schema 构造器

核心类：TableSchemaBuilder，作用是将不同的参数统一收敛为 TableSchema 对象。

![image](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/922c7301-06d1-4b06-8aeb-322ae9bf0d3d)

其中，buildFromSql（根据 SQL 生成 Schema）使用了 Druid 数据库连接池自带的语法解析器，非常强大。


### 生成器

#### 多种生成类型

将每种生成类型定义为一个 Builder（core/builder 目录）：

![image](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/526294f8-d41e-4068-8407-6ddaa2a6c5d2)


其中，对于 SQL 代码生成器（ SqlBuilder），使用方言来支持不同的数据库类型（策略模式），并使用单例模式 + 工厂模式创建方言实例。

对于 Java、前端代码生成器（JavaCodeBuilder、FrontendCodeBuilder），使用 FreeMarker 模板引擎来生成。

![image](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/6bb2f8a7-e787-4e90-acee-5042be69cfd4)




#### 多种模拟数据生成规则

每种生成规则定义为一个 Generator，使用 DataGeneratorFactory（工厂模式）对多个 Generator 实例进行统一的创建和管理。

![image](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/e3107211-9d39-4372-bb1a-19789f194800)


使用 dataFaker 库实现随机数据生成（RandomDataGenerator）。

使用 Generex 库实现正则表达式数据生成（RuleDataGenerator)。




#### 统一的生成入口

使用门面模式聚合各种生成类型，提供统一的生成调用和校验方法：

![image](https://github.com/wenzhou1616/sql-generate-tool-backend/assets/92576687/f3c36063-7273-464a-8cc7-b9d9960e583b)


### 共享服务
对表、字段、词库的共享，其实就是对这些实体的增删改查 web 服务。

