package dto;

public class CommentOutputDTO {
	String id = null;
	String content = null;
	String time = null;
	String writername = null;
	short[] writerphoto = null;

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

	public String getWritername() {
		return writername;
	}

	public void setWritername(String writername) {
		this.writername = writername;
	}

	public short[] getWriterphoto() {
		return writerphoto;
	}

	public void setWriterphoto(short[] writerphoto) {
		this.writerphoto = writerphoto;
	}

}
