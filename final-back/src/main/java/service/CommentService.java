package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.CommentDAO;
import dto.CommentDTO;
import dto.CommentWriterDTO;

@Service
public class CommentService {
	@Autowired
	CommentDAO dao;
	
	
	public CommentWriterDTO[] getComments(String articleid) {
		return dao.selectComments(articleid);
	}
	
	public String addComment(CommentDTO dto) {
		try {
			dao.insertComment(dto);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "실패";
		}
	}
	
	public String deleteComment(String id) {
		try {
			dao.deleteComment(id);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "실패";
		}		
	}
}
