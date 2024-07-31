package org.zerock.project_academy.reference.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.project_academy.reference.repository.ReferenceResourceRepository;
import org.zerock.project_academy.reference.serivce.ReferenceResourceService;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/reference/files")
public class ReferenceResourceController {
    private final ReferenceResourceRepository referenceResourceRepository;
    private final Path fileStorageLocation = Paths.get( "file-storage").toAbsolutePath().normalize();


    @DeleteMapping("{rrno}")
    public ResponseEntity<Object> deleteFile(@PathVariable long rrno) {
        referenceResourceRepository.deleteById(rrno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
