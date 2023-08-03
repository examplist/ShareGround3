package dto;

public class ArticleListInputDTO {
	String value;
	int start;
	int limit = 4;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}
	
	public int getLimit() {
		return limit;
	}

}
