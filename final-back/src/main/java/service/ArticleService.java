package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ArticleDAO;
import dto.ArticleDTO;
import dto.ArticleUserDTO;

@Service
public class ArticleService {

	@Autowired
	ArticleDAO dao;

	public ArticleDTO readArticle(String id) {
		ArticleUserDTO articleuserdto = dao.readArticle(id);
		ArticleDTO articledto = new ArticleDTO();
		if (articleuserdto == null) {
			return null;			
		}
		articledto.setId(articleuserdto.getId());
		articledto.setCategory(articleuserdto.getCategory());
		articledto.setTitle(articleuserdto.getTitle());
		articledto.setContent(articleuserdto.getContent());
		articledto.setTime(articleuserdto.getTime());
		articledto.setFilename(articleuserdto.getFilename());
		articledto.setFiletype(articleuserdto.getFiletype());
		articledto.setFileurl(articleuserdto.getFileurl());
		if (articleuserdto.getWriter() != null) {
			articledto.setWriter(articleuserdto.getWriter().getName());			
		}
		return articledto;			
	}

	public String createArticle(ArticleDTO dto) {
		try {
			dao.createArticle(dto);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}

	public String updateArticle(ArticleDTO dto) {
		try {
			dao.updateArticle(dto);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
	}

	public String deleteArticle(String id) {
		try {
			dao.deleteArticle(id);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "실패";
		}
	}
}
