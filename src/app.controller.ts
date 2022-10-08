import {
  Controller,
  Get,
  Render,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Body,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Article } from "./article.model";
import { articles } from "./articles";

@Controller()
export class AppController {
  @Get()
  @Render("index")
  index() {
    return { articles };
  }

  @Get("create")
  @Render("create-article")
  getForm(): void {
    return;
  }

  @Post("articles")
  @Redirect("/", 301)
  create(@Body() body: any): void {
    const id = articles.length + 1;
    const article = new Article(body.title, body.content, id);
    articles.push(article);
  }

  @Get(":id")
  @Render("article")
  getById(@Param("id", ParseIntPipe) id: number) {
    return articles.find((article) => article.id === id);
  }
}
