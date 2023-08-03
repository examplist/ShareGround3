package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.UserDTO;
import dto.UserOutputDTO;
import service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	@Autowired
	UserService service;

	@RequestMapping("/login")
	public UserOutputDTO login(@RequestBody UserDTO userInput) {
		UserOutputDTO UserOutputDTO = new UserOutputDTO();
		UserDTO dto = service.login(userInput.email, userInput.pw);
		if (dto == null) {
			UserOutputDTO.setErrorMessage("죄송합니다. 해당 계정이 존재하지 않습니다.");
		} else {
			UserOutputDTO.setSucceeded(true);
			UserOutputDTO.setEmail(dto.getEmail());
			UserOutputDTO.setName(dto.getName());
			// 사진 short로 바꾸기
			byte[] photoByte = dto.getPhoto();
			if (photoByte != null) {
				short[] photoShort = new short[photoByte.length];
				for (int i = 0; i < photoShort.length; i++) {
					photoShort[i] = photoByte[i];
				}
				UserOutputDTO.setPhoto(photoShort);
			}
		}
		return UserOutputDTO;
	}

	@RequestMapping("/signup")
	public UserOutputDTO signup(@RequestBody UserDTO userInput) {
		UserOutputDTO UserOutputDTO = new UserOutputDTO();
		String result = service.signup(userInput.email, userInput.pw);
		if (result.equals("실패-중복")) {
			UserOutputDTO.setErrorMessage("죄송합니다. 해당 계정이 이미 존재합니다.");
			return UserOutputDTO;
		}
		UserDTO dto = service.login(userInput.email, userInput.pw);
		if (dto == null) {
			UserOutputDTO.setErrorMessage("죄송합니다. 해당 계정이 존재하지 않습니다.");
			return UserOutputDTO;
		} else {
			UserOutputDTO.setSucceeded(true);
			UserOutputDTO.setEmail(dto.getEmail());
			UserOutputDTO.setName(dto.getName());
			return UserOutputDTO;
		}
	}

	@RequestMapping("/change-username")
	public String changeUsername(@RequestBody UserDTO userInput) {
		return service.changeUsername(userInput.email, userInput.name);
	}

	@RequestMapping("/change-userphoto")
	public String changeUserphoto(@RequestBody UserDTO userInput) {
		return service.changeUserphoto(userInput.email, userInput.photo);
	}

	@RequestMapping("/delete-account")
	public String deleteAccount(@RequestBody UserDTO userInput) {
		String result = service.deleteAccount(userInput.email);
		if (result != "성공") {
			return result;
		}
		return "성공";
	}
}
