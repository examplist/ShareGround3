package dto;

public class UserOutputDTO {
	boolean succeeded = false;
	String email = null;
	String name = null;
	short[] photo = null;
	String errorMessage = null;

	public boolean isSucceeded() {
		return succeeded;
	}

	public void setSucceeded(boolean succeeded) {
		this.succeeded = succeeded;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public short[] getPhoto() {
		return photo;
	}

	public void setPhoto(short[] photo) {
		this.photo = photo;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
