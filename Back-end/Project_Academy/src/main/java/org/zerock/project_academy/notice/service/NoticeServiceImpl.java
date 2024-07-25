package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.aspectj.weaver.ast.Not;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.member.domain.Member;
import org.zerock.project_academy.member.repository.MemberRepository;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.NoticeDTO;
import org.zerock.project_academy.notice.dto.NoticeListDTO;
import org.zerock.project_academy.notice.repository.NoticeRepository;
import org.zerock.project_academy.notice.repository.NoticeResourceRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final NoticeResourceService noticeResourceService;
    private final ModelMapper modelMapper;
    private final NoticeResourceRepository noticeResourceRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<NoticeListDTO> findAllNotice() {
      List<Notice> noticeList = noticeRepository.findAll();
      List<NoticeListDTO> noticeDTOList =  noticeList.stream().map(notice -> modelMapper.map(notice, NoticeListDTO.class)).collect(Collectors.toList());
      return noticeDTOList;
    }

    @Override
    public NoticeDTO addNotice(NoticeDTO noticeDTO) {
//        String writer = member.
//        Optional<Member> result = memberRepository.findById(noticeDTO.getWriter());
//        Member member = result.orElseThrow();
        Notice notice = Notice.builder()
                .n_title(noticeDTO.getN_title())
                .n_content(noticeDTO.getN_content())
                .n_image(noticeDTO.getN_image())
                .writer(noticeDTO.getWriter())
                .build();
        Notice savedNotice = noticeRepository.save(notice);
        return modelMapper.map(savedNotice, NoticeDTO.class);
    }
    @Override
    public Optional<Notice> findOneNoticeById(Long nno) {
        return noticeRepository.findById(nno);
    }

    @Override
    public void deleteNotice(Long nno) {
        noticeRepository.deleteById(nno);
        noticeResourceRepository.deleteById(nno);
    }

    @Override
    public Notice modifyNotice(NoticeDTO noticeDTO) {
        Optional<Notice> result = noticeRepository.findById(noticeDTO.getNno());
         if(!result.isPresent()){
             throw new NoSuchElementException("Notice Not found with ID: " + noticeDTO.getNno());
         }
         Notice notice = result.get();
         notice.changeNotice(
                 noticeDTO.getN_title(),
                 noticeDTO.getN_content(),
                 noticeDTO.getN_image(),
//                 noticeDTO.getWriter()
                 Member.builder().mno(noticeDTO.getWriter()).build()
         );
         Notice savedNotice = noticeRepository.save(notice);
         return savedNotice;
    }

}
