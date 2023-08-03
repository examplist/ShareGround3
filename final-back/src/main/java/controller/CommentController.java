package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.CommentDTO;
import dto.CommentOutputDTO;
import dto.CommentWriterDTO;
import service.CommentService;

@RestController
@CrossOrigin(origins = "*")
public class CommentController {
	@Autowired
	CommentService service;

	@RequestMapping("/comments-get/{articleid}")
	public CommentOutputDTO[] getComments(@PathVariable("articleid") String articleid) {
		CommentWriterDTO[] dtosFromService = service.getComments(articleid);
		CommentOutputDTO[] dtosOutput = new CommentOutputDTO[dtosFromService.length];
		for (int i = 0; i < dtosOutput.length; i++) {
			dtosOutput[i] = new CommentOutputDTO();
			dtosOutput[i].setId(dtosFromService[i].getId());
			dtosOutput[i].setContent(dtosFromService[i].getContent());
			dtosOutput[i].setTime(dtosFromService[i].getTime());
			// 작성자의 경우 탈퇴한 경우가 있고, 그렇지 않은 경우가 있다.
			if (dtosFromService[i].getWriter() != null) {
				dtosOutput[i].setWritername(dtosFromService[i].getWriter().getName());
				byte[] photoByte = dtosFromService[i].getWriter().getPhoto();
				if (photoByte != null) {
					short[] photoShort = new short[photoByte.length];
					for (int j = 0; j < photoShort.length; j++) {
						photoShort[j] = photoByte[j];
					}
					dtosOutput[i].setWriterphoto(photoShort);
				}
			}
		}
		return dtosOutput;
	}

	@RequestMapping("/comments-add")
	public String addComment(@RequestBody CommentDTO dto) {
		return service.addComment(dto);
	}

	@RequestMapping("/comments-delete/{id}")
	public String deleteComment(@PathVariable("id") String id) {
		return service.deleteComment(id);
	}
}
