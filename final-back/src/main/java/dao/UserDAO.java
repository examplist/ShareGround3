package dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import dto.UserDTO;

@Mapper
@Repository
public interface UserDAO {
	public UserDTO login(UserDTO dto);

	public int signup(UserDTO dto);

	public int changeUsername(UserDTO dto);

	public int changeUserphoto(UserDTO dto);

	public int deleteAccount(String email);
}
