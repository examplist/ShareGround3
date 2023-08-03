package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ArticleListDAO;
import dto.ArticleDTO;
import dto.ArticleListInputDTO;

@Service
public class ArticleListService {
	@Autowired
	ArticleListDAO dao;
	
	public ArticleDTO[] getArticlesByCategory(ArticleListInputDTO dto) {
		return dao.getArticlesByCategory(dto);
	}
	
	public int getPageCountByCategory(String category) {
		ArticleListInputDTO dto = new ArticleListInputDTO();
		int rowCount = dao.getCountByCategory(category);
		int pageCount = (int) Math.ceil((double) rowCount / dto.getLimit());
		return pageCount;
	}
	
	public ArticleDTO[] getArticlesByWriter(ArticleListInputDTO dto) {
		return dao.getArticlesByWriter(dto);
	}
	
	public int getPageCountByWriter(String writer) {
		ArticleListInputDTO dto = new ArticleListInputDTO();
		int rowCount = dao.getCountByWriter(writer);
		int pageCount = (int) Math.ceil((double) rowCount / dto.getLimit());
		return pageCount;		
	}
	
	public ArticleDTO[] getSearchList(String keyword) {
		return dao.getSearchList(keyword);
	}
}
