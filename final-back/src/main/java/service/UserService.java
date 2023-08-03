package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDAO;
import dto.UserDTO;

@Service
public class UserService {
	@Autowired
	UserDAO dao;
	
	public UserDTO login(String email, String pw) {
		UserDTO dto = new UserDTO();
		dto.setEmail(email);
		dto.setPw(pw);
		return dao.login(dto);
	}
	
	public String signup(String email, String pw) {
		UserDTO dto = new UserDTO();
		dto.setEmail(email);
		dto.setPw(pw);
		String name = email.substring(0, email.indexOf("@"));
		dto.setName(name);
		try {
			dao.signup(dto);
			return "성공";
		} catch (Exception e) {
			if (e.getMessage().contains("Duplicate")) {
				return "실패-중복";
			}
			return "실패-기타";
		}
	}
	
	public String changeUsername(String email, String name) {
		UserDTO dto =  new UserDTO();
		dto.setEmail(email);
		dto.setName(name);
		try {
			dao.changeUsername(dto);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "죄송합니다. 문제가 발생했습니다.";
		}
	}
	
	public String changeUserphoto(String email, byte[] photo) {
		UserDTO dto = new UserDTO();
		dto.setEmail(email);
		dto.setPhoto(photo);
		try {
			dao.changeUserphoto(dto);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "죄송합니다. 문제가 발생했습니다.";
		}
	}
	
	public String deleteAccount(String email) {
		try {
			dao.deleteAccount(email);
			return "성공";
		} catch (Exception e) {
			e.printStackTrace();
			return "죄송합니다. 계정을 삭제하지 못했습니다.";
		}
	}
}
