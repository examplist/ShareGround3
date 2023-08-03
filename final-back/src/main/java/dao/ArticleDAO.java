package dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import dto.ArticleDTO;
import dto.ArticleUserDTO;

@Mapper
@Repository
public interface ArticleDAO {
	public ArticleUserDTO readArticle(String id);
	public int createArticle(ArticleDTO dto);
	public int updateArticle(ArticleDTO dto);
	public int deleteArticle(String id);
}
