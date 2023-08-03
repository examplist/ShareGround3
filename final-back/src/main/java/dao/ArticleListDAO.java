package dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import dto.ArticleDTO;
import dto.ArticleListInputDTO;

@Mapper
@Repository
public interface ArticleListDAO {
	public ArticleDTO[] getArticlesByCategory(ArticleListInputDTO dto);
	public int getCountByCategory(String category);
	public ArticleDTO[] getArticlesByWriter(ArticleListInputDTO dto);
	public int getCountByWriter(String writer);
	public ArticleDTO[] getSearchList(String keyword);
}
