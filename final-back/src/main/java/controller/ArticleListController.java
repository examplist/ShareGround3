package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.ArticleDTO;
import dto.ArticleListInputDTO;
import dto.ArticleListOutputDTO;
import service.ArticleListService;

@RestController
@CrossOrigin("*")
public class ArticleListController {
	@Autowired
	ArticleListService service;

	@RequestMapping("/category/{value}/{page}")
	public ArticleListOutputDTO getArticlesByCategory(@PathVariable("value") String value,
			@PathVariable("page") String page) {
		ArticleListOutputDTO info = new ArticleListOutputDTO();
		ArticleListInputDTO input = new ArticleListInputDTO();
		input.setValue(value);
		input.setStart((Integer.parseInt(page) - 1) * input.getLimit());
		ArticleDTO[] articles = service.getArticlesByCategory(input);
		int pageCount = service.getPageCountByCategory(value);
		info.setSucceeded(true);
		info.setDtos(articles);
		info.setPageCount(pageCount);
		return info;
	}

	@RequestMapping("/wrotelist/{email}/{page}")
	public ArticleListOutputDTO getWroteList(@PathVariable("email") String email, @PathVariable("page") String page) {
		ArticleListOutputDTO info = new ArticleListOutputDTO();
		ArticleListInputDTO input = new ArticleListInputDTO();
		input.setValue(email);
		input.setStart((Integer.parseInt(page) - 1) * input.getLimit());
		ArticleDTO[] articles = service.getArticlesByWriter(input);
		int pageCount = service.getPageCountByWriter(email);
		info.setSucceeded(true);
		info.setDtos(articles);
		info.setPageCount(pageCount);
		return info;
	}

	@RequestMapping("/search/{keyword}")
	public ArticleListOutputDTO getSearchList(@PathVariable("keyword") String keyword) {
		ArticleListOutputDTO info = new ArticleListOutputDTO();
		ArticleDTO[] articles = service.getSearchList(keyword);
		info.setSucceeded(true);
		info.setDtos(articles);
		return info;
	}
}
