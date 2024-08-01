package org.zerock.project_academy.reference.serivce;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.repository.MemberRepository;
import org.zerock.project_academy.reference.domain.Reference;
import org.zerock.project_academy.reference.domain.ReferenceResource;
import org.zerock.project_academy.reference.dto.ReferenceDTO;
import org.zerock.project_academy.reference.dto.ReferenceListDTO;
import org.zerock.project_academy.reference.dto.ReferenceResourceDTO;
import org.zerock.project_academy.reference.dto.ReferenceResourceListDTO;
import org.zerock.project_academy.reference.repository.ReferenceRepository;
import org.zerock.project_academy.reference.repository.ReferenceResourceRepository;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ReferenceServiceImpl implements ReferenceService {
    private final ReferenceRepository referenceRepository;
    private final ModelMapper modelMapper;
    private final ReferenceResourceRepository referenceResourceRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<ReferenceListDTO> findAllReferences() {
        List<Reference> referenceList = referenceRepository.findAll();
        List<ReferenceListDTO> referenceDTOList = referenceList.stream().map(reference -> modelMapper.map(reference, ReferenceListDTO.class)).collect(Collectors.toList());
        return referenceDTOList;
    }

    @Override
    public ReferenceDTO addReference(ReferenceDTO referenceDTO) {
        Reference reference = Reference.builder()
                .r_title(referenceDTO.getR_title())
                .r_content(referenceDTO.getR_content())
                .r_image(referenceDTO.getR_content())
                .writer(referenceDTO.getWriter())
                .build();
        Reference savedReference = referenceRepository.save(reference);
        return modelMapper.map(savedReference, ReferenceDTO.class);
    }

    @Override
    public ReferenceListDTO findOneReferenceById(Long rno) {
        Optional<Reference> result = referenceRepository.findById(rno);
        Reference reference = result.orElseThrow();
        Set<ReferenceResource> rrList = reference.getReferenceResourceSet();
        List<ReferenceResourceListDTO> rrDtoList = new ArrayList<>();
        for (ReferenceResource referenceResource : rrList) {
            rrDtoList.add(ReferenceResourceListDTO.builder()
                    .rrno(referenceResource.getRrno())
                    .file_size(referenceResource.getFile_size())
                    .rr_name(referenceResource.getRr_name())
                    .rr_ord(referenceResource.getRr_ord())
                    .rr_path(referenceResource.getRr_path())
                            .rr_type(referenceResource.getRr_type())
                            .rno(referenceResource.getReference().getRno())
                    .build());
        }
        ReferenceListDTO referenceListDTO = ReferenceListDTO.builder()
                .rno(reference.getRno())
                .r_title(reference.getR_title())
                .r_content(reference.getR_content())
                .r_image(reference.getR_image())
                .writer(reference.getWriter())
                .regDate(reference.getRegDate())
                .references_resource(rrDtoList)
                .build();

        return referenceListDTO;
    }

    @Override
    public void deleteReference(Long rno) {
        referenceRepository.deleteById(rno);
        referenceResourceRepository.deleteById(rno);
    }

    @Override
    public Reference modifyReference(ReferenceDTO referenceDTO) {
        Optional<Reference> result = referenceRepository.findById(referenceDTO.getRno());
        if(!result.isPresent()){
            throw new NoSuchElementException("Reference Not found with ID:"+ referenceDTO.getRno());
        }
        Reference reference = result.get();
        reference.changeReference(
                referenceDTO.getR_title(),
                referenceDTO.getR_content(),
                referenceDTO.getR_image(),
                Member.builder().mno(referenceDTO.getWriter()).build()
        );
        Reference savedReference = referenceRepository.save(reference);
        return savedReference;
    }
}
