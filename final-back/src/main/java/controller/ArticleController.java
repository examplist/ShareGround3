package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.ArticleDTO;
import dto.ArticleOutputDTO;
import service.ArticleService;

@RestController
@CrossOrigin("*")
public class ArticleController {
	@Autowired
	ArticleService service;

	@RequestMapping("article/{id}")
	public ArticleOutputDTO readArticle(@PathVariable("id") String id) {
		ArticleOutputDTO ArticleOutputDTO = new ArticleOutputDTO();
		ArticleDTO articledto = service.readArticle(id);
		if (articledto == null) {
			ArticleOutputDTO.setErrorMessage("해당 글이 존재하지 않습니다.");
			return ArticleOutputDTO;
		}
		ArticleOutputDTO.setDto(articledto);
		ArticleOutputDTO.setSucceeded(true);
		return ArticleOutputDTO;
	}

	@RequestMapping("create-article")
	public ArticleOutputDTO createArticle(@RequestBody ArticleDTO dto) {
		ArticleOutputDTO ArticleOutputDTO = new ArticleOutputDTO();
		String result = service.createArticle(dto);
		if (result.equals("성공")) {
			ArticleDTO articledto = service.readArticle(dto.getId());
			ArticleOutputDTO.setDto(articledto);
			ArticleOutputDTO.setSucceeded(true);
			return ArticleOutputDTO;
		} else {
			ArticleOutputDTO.setErrorMessage("죄송합니다. 문제가 발생했습니다.");
			return ArticleOutputDTO;
		}
	}

	@RequestMapping("update-article")
	public ArticleOutputDTO updateArticle(@RequestBody ArticleDTO dto) {
		ArticleOutputDTO ArticleOutputDTO = new ArticleOutputDTO();
		String result = service.updateArticle(dto);
		if (result.equals("성공")) {
			ArticleDTO articledto = service.readArticle(dto.getId());
			ArticleOutputDTO.setDto(articledto);
			ArticleOutputDTO.setSucceeded(true);
			return ArticleOutputDTO;
		} else {
			ArticleOutputDTO.setErrorMessage("죄송합니다. 문제가 발생했습니다.");
			return ArticleOutputDTO;
		}
	}

	@RequestMapping("delete-article")
	public String deleteArticle(@RequestBody ArticleDTO dto) {
		return service.deleteArticle(dto.getId());
	}
}
