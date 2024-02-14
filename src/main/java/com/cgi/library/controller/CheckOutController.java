package com.cgi.library.controller;

import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.model.ReturnDTO;
import com.cgi.library.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/checkout")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    // http://localhost:8080/api/checkout/getCheckouts?page=0&size=3&sort=checkedOutDate&direction=DESC
    @GetMapping(value = "getCheckouts")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOuts(Pageable pageable) {
        System.out.println("Pageable object: " + pageable);
        return ResponseEntity.ok(checkOutService.getCheckOuts(pageable));
    }

    @GetMapping(value = "getCheckout")
    public ResponseEntity<CheckOutDTO> getCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        return ResponseEntity.ok(checkOutService.getCheckOut(checkOutId));
    }

    @PostMapping(value = "checkout")
    public ResponseEntity<String> saveCheckOut(@RequestBody CheckOutDTO checkOutDTO) {
        System.out.println("Sain logi kätte " + checkOutDTO.toString());
        checkOutService.saveCheckOut(checkOutDTO);
        return ResponseEntity.ok("");
    }

    @PostMapping(value = "return")
    ResponseEntity<String> returnBook(@RequestBody ReturnDTO returnDTO) {
        System.out.println("Sain return logi kätte " + returnDTO.toString());
//        checkOutService.saveCheckOut(checkOutDTO);
        return ResponseEntity.ok("{\"message\": \"Book returned\"}");
    }

    @DeleteMapping(value = "checkout")
    public ResponseEntity<String> deleteCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        checkOutService.deleteCheckOut(checkOutId);
        return ResponseEntity.ok("");
    }
}
