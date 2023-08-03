package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.ArticleDTO;
import dto.ArticleListInputDTO;
import dto.ArticleListOutputDTO;
import dto.InterestDTO;
import service.InterestService;

@RestController
@CrossOrigin(origins = "*")
public class InterestController {
	@Autowired
	InterestService service;

	@RequestMapping("/interest-whether")
	public boolean interestWhether(@RequestBody InterestDTO dto) {
		return service.interestWhether(dto);
	}

	@RequestMapping("/interest-add")
	public boolean addInterest(@RequestBody InterestDTO dto) {
		service.addInterest(dto);
		return service.interestWhether(dto);
	}

	@RequestMapping("/interest-delete")
	public boolean deleteInterest(@RequestBody InterestDTO dto) {
		service.deleteInterest(dto);
		return service.interestWhether(dto);
	}

	@RequestMapping("/interestlist/{user}/{page}")
	public ArticleListOutputDTO getInterestList(@PathVariable("user") String user, @PathVariable("page") String page) {
		ArticleListInputDTO input = new ArticleListInputDTO();
		input.setValue(user);
		input.setStart((Integer.parseInt(page) - 1) * input.getLimit());
		ArticleListOutputDTO info = new ArticleListOutputDTO();
		ArticleDTO[] articles = service.getArticlesByInterest(input);
		int pageCount = service.getPageCountByUser(user);
		info.setSucceeded(true);
		info.setDtos(articles);
		info.setPageCount(pageCount);
		return info;
	}
}
