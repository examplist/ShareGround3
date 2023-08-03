package dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import dto.ArticleDTO;
import dto.ArticleListInputDTO;
import dto.InterestDTO;

@Mapper
@Repository
public interface InterestDAO {
	public InterestDTO selectCase(InterestDTO dto);

	public int insertCase(InterestDTO dto);

	public int deleteCase(InterestDTO dto);

	public ArticleDTO[] getArticlesByInterest(ArticleListInputDTO dto);

	public int getCountByUser(String user);
}
