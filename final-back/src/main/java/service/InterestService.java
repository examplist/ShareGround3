package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.InterestDAO;
import dto.ArticleDTO;
import dto.ArticleListInputDTO;
import dto.InterestDTO;

@Service
public class InterestService {
	@Autowired
	InterestDAO dao;

	public boolean interestWhether(InterestDTO dto) {
		InterestDTO result = dao.selectCase(dto);
		if (result == null) {
			return false;
		} else {
			return true;
		}
	}

	public int addInterest(InterestDTO dto) {
		return dao.insertCase(dto);
	}

	public int deleteInterest(InterestDTO dto) {
		return dao.deleteCase(dto);
	}

	public ArticleDTO[] getArticlesByInterest(ArticleListInputDTO input) {
		return dao.getArticlesByInterest(input);
	}

	public int getPageCountByUser(String user) {
		ArticleListInputDTO dto = new ArticleListInputDTO();
		int rowCount = dao.getCountByUser(user);
		int pageCount = (int) Math.ceil((double) rowCount / dto.getLimit());
		return pageCount;
	}

}