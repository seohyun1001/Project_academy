package org.zerock.project_academy.notice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.project_academy.notice.domain.Notice;
import org.zerock.project_academy.notice.repository.NoticeRepository;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<Notice> findAllNotice() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice addNotice(Notice notice) {
        return noticeRepository.save(notice);
    }
    @Override
    public Optional<Notice> findOneNoticeById(Long nno) {
        return noticeRepository.findById(nno);
    }
}
