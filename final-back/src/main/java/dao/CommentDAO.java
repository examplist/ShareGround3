package dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import dto.CommentDTO;
import dto.CommentWriterDTO;

@Mapper
@Repository
public interface CommentDAO {
	public CommentWriterDTO[] selectComments(String articleid);
	public int insertComment(CommentDTO dto);
	public int deleteComment(String id);
}
