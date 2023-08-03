package controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping("/")
	public List<C> sendObjectList() {
		List<C> list = new ArrayList<C>();
		C c1 = new C("a", 1);
		list.add(c1);
		C c2 = new C("b", 2);
		list.add(c2);
		return list;
	}
}
