package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.project_academy.notice.domain.Notice;
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


    @Override
    public List<Notice> findAllNotice() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice addNotice(Notice notice,List<NoticeResourceDTO> resourceDtoList) {
        Notice savedNotice = noticeRepository.save(notice);
        noticeResourceService.saveAll(resourceDtoList);
        return savedNotice;
    }
    @Override
    public Optional<Notice> findOneNoticeById(Long nno) {
        return noticeRepository.findById(nno);
    }
}
