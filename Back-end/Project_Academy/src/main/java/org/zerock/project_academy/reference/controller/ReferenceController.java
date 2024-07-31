package org.zerock.project_academy.reference.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.reference.domain.Reference;
import org.zerock.project_academy.reference.dto.ReferenceDTO;
import org.zerock.project_academy.reference.dto.ReferenceListDTO;
import org.zerock.project_academy.reference.dto.ReferenceResourceDTO;
import org.zerock.project_academy.reference.serivce.ReferenceResourceService;
import org.zerock.project_academy.reference.serivce.ReferenceService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reference")
@CrossOrigin("http://localhost:3000")
@Log4j2
public class ReferenceController {
    private final ReferenceService referenceService;
    private final ReferenceResourceService referenceResourceService;
    private ReferenceDTO referenceDTO;

    @GetMapping("/list")
    public List<ReferenceListDTO> getReferenceList() {
        return referenceService.findAllReferences();
    }
    @PostMapping(value = "/register", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> addReference(ReferenceDTO referenceDTO) {
        List<ReferenceResourceDTO> resourceDTOList = new ArrayList<ReferenceResourceDTO>();
        ReferenceDTO savedReference = referenceService.addReference(referenceDTO);
        if(referenceDTO.getFiles() != null){
            int ord = 0;
            for (MultipartFile file : referenceDTO.getFiles()) {
                Path savePath = Paths.get("C:\\upload", file.getOriginalFilename());
                try {
                    file.transferTo(savePath);
                }catch (Exception e){
                    e.printStackTrace();
                }
                ReferenceResourceDTO dto = ReferenceResourceDTO.builder()
                        .rr_name(file.getOriginalFilename())
                        .rr_ord(ord)
                        .rr_type(file.getContentType())
                        .rno(savedReference.getRno())
                        .build();
                resourceDTOList.add(dto);
                ord++;
            }
            referenceResourceService.saveAll(resourceDTOList);
        }
        return new ResponseEntity<>(savedReference, HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<Object> getReference(@RequestParam Long rno){
        ReferenceListDTO oneReference = referenceService.findOneReferenceById(rno);
        if(oneReference != null && oneReference.getRno() != null){
            return new ResponseEntity<>(oneReference, HttpStatus.OK);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reference not found with id " + rno);
        }
    }

    @DeleteMapping("/{rno}")
    public ResponseEntity<Object> deleteReference(@PathVariable Long rno){
        referenceService.deleteReference(rno);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{rno}")
    public ResponseEntity<Object> modifyReference(ReferenceDTO referenceDTO){
        try {
            int ord = 0;
            List<ReferenceResourceDTO> resourceDTOList = new ArrayList<ReferenceResourceDTO>();
            for (MultipartFile file : referenceDTO.getFiles()){
                Path savePath = Paths.get("C:\\upload", file.getOriginalFilename());
                try {
                    file.transferTo(savePath);
                }catch (Exception e){
                    e.printStackTrace();
                }
                ReferenceResourceDTO dto = ReferenceResourceDTO.builder()
                        .rr_name(file.getOriginalFilename())
                        .rr_ord(ord)
                        .rr_type(file.getContentType())
                        .rno(referenceDTO.getRno())
                        .build();
                resourceDTOList.add(dto);
                ord++;
            }
            referenceResourceService.deleteReferenceResource(referenceDTO.getRno());
            referenceResourceService.saveAll(resourceDTOList);

            Reference modifiedReference = referenceService.modifyReference(referenceDTO);
            return new ResponseEntity<>(modifiedReference, HttpStatus.OK);

        }catch (NoSuchElementException e){
            log.error("Reference not found with ID:"+ referenceDTO.getRno(), e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
