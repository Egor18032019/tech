package com.ural.tech.service;

import com.ural.tech.schemas.AllNewsResponse;
import com.ural.tech.schemas.NewsResponse;
import com.ural.tech.store.News;
import com.ural.tech.store.NewsRepository;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service()
public class NewsService {
    NewsRepository newsRepository;
    MeterRegistry registry;

    public NewsService(NewsRepository newsRepository,MeterRegistry registry) {
        this.newsRepository = newsRepository;
        this.registry = registry;
    }

    public News saveNews(String description, Path pathToImage, String start, String end) {
        News news = new News(description, pathToImage.toString(), start, end);
        return newsRepository.save(news);
    }

    public News saveNews(String description, String start, String end) {
        News news = new News(description, start, end);
        return newsRepository.save(news);
    }

    public AllNewsResponse getAllNewsForResponse(Optional<Integer> limit, Optional<Integer> offset) {
        List<News> newsList = newsRepository.findAll();
        int realLimit = newsList.size();
        registry.summary("news.total", "news",  "realLimit").record(realLimit);

        if (limit.isPresent()) {
            realLimit = limit.get();
            //todo пользовательские exception ?
            if (realLimit < 1) {
                //todo ("Напиши exception");
                System.out.println("  throw new BadRequestException(\"The limit cannot be less than 1.\");");
                realLimit = newsList.size();
            }

        }
        if (newsList.size() < realLimit) {
            realLimit = newsList.size();
        }

        int realOffset = 0;
        if (offset.isPresent()) {
            realOffset = offset.get();

            if (realOffset > newsList.size()) {
                realOffset = newsList.size() - 2;
            }
            if (realOffset <= 0) {
                System.out.println("The offset cannot be less than 0");
//                throw new BadRequestException("The offset cannot be less than 0.");
                realOffset = 0;
            }
        }


        List<NewsResponse> newsResponses = new ArrayList<>();
        //TODO может из БД лимит и офсет sql запросом?
        for (int i = realOffset; i < realLimit; i++) {
            News point = newsList.get(i);

            NewsResponse newsResponse = new NewsResponse(point.getId(), point.getDescription(), point.getBeginning(), point.getFinish(), point.getCreatedAt(), point.getUrlImage());
            newsResponses.add(newsResponse);
        }

        return new AllNewsResponse(newsResponses, realLimit, realOffset);

    }

    public void delete(String id) {
        Long idNews = Long.valueOf(id);
        newsRepository.deleteById(idNews);
    }
}
