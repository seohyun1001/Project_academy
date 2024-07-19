package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.dto.NoticeDTO;
import org.zerock.project_academy.notice.dto.NoticeResourceDTO;
import org.zerock.project_academy.notice.repository.NoticeRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final NoticeResourceService noticeResourceService;
    private final ModelMapper modelMapper;


    @Override
    public List<Notice> findAllNotice() {
        return noticeRepository.findAll();
    }

    @Override
    public NoticeDTO addNotice(NoticeDTO notice) {
        Notice savedNotice = noticeRepository.save(modelMapper.map(notice, Notice.class));
        return modelMapper.map(savedNotice, NoticeDTO.class);
    }
    @Override
    public Optional<Notice> findOneNoticeById(Long nno) {
        return noticeRepository.findById(nno);
    }

    @Override
    public void deleteNotice(Long nno) {
        noticeRepository.deleteById(nno);
    }
}
