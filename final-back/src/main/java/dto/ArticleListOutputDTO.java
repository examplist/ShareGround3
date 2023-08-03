package dto;

public class ArticleListOutputDTO {
	boolean succeeded = false;
	String errorMessage = null;
	ArticleDTO[] dtos = null;
	int pageCount = 0;

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

	public ArticleDTO[] getDtos() {
		return dtos;
	}

	public void setDtos(ArticleDTO[] dtos) {
		this.dtos = dtos;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

}
