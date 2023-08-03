package dto;

public class ArticleOutputDTO {
	boolean succeeded = false;
	String errorMessage = null;
	ArticleDTO dto = null;

	public boolean isSucceeded() {
		return succeeded;
	}

	public void setSucceeded(boolean succeeded) {
		this.succeeded = succeeded;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public ArticleDTO getDto() {
		return dto;
	}

	public void setDto(ArticleDTO dto) {
		this.dto = dto;
	}

}
