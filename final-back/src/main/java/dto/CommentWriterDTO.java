package dto;

public class CommentWriterDTO {
	String id;
	String content;
	String time;
	UserDTO writer;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public UserDTO getWriter() {
		return writer;
	}

	public void setWriter(UserDTO writer) {
		this.writer = writer;
	}

}
