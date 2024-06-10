package com.example.demo.controller;

import com.example.demo.entity.Juego;
import com.example.demo.repository.JuegoRepository;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/Juegos")
@CrossOrigin("*")
public class JuegoController {

    @Autowired
    private JuegoRepository JuegoRepository;

    @GetMapping()
    public ResponseEntity<Iterable<Juego>> getAllGames() {
        Iterable<Juego> juegos = JuegoRepository.findAll();
        for (Juego juego : juegos) {
            System.out.println(juego); // Imprimir todos los atributos del juego
        }
        return ResponseEntity.ok(juegos);
    }

    @GetMapping("/{gameUrl}")
    public ResponseEntity<Juego> getGameImage(@PathVariable String gameUrl) {

        // Construir la URL completa del juego en Metacritic
        String baseUrl = "https://www.metacritic.com/game/";
        String fullUrl = baseUrl + gameUrl;
        Juego juego = JuegoRepository.findById(gameUrl).orElse(null);

        try {

            if (juego != null) {
                return ResponseEntity.ok(juego);
            } else {
                // Realizar web scraping si el juego no se encuentra en la base de datos
                Playwright playwright = Playwright.create();
                Browser browser = playwright.webkit().launch();
                Page page = browser.newPage();
                page.navigate(fullUrl);
                page.waitForSelector(
                        "#__layout > div > div.c-layoutDefault_page > div.c-pageProductGame > div:nth-child(1) > div > div > div.c-productHero_player-scoreInfo.u-grid.g-grid-container > div:nth-child(1) > div.c-productHero_playerContainer.g-container-rounded-medium > div > picture > img");

                Document gamePage = Jsoup.parse(page.content());
                Elements images = gamePage.select("picture.c-cmsImage img");

                if (!images.isEmpty()) {
                    String imageUrl = images.attr("src");

                    // Crear un nuevo juego y guardarlo en la base de datos
                    juego = new Juego();
                    juego.setName(gameUrl);
                    juego.setURL(imageUrl);
                    JuegoRepository.save(juego);

                    return ResponseEntity.ok(juego);
                } else {
                    return ResponseEntity.notFound().build();
                }
            }
        } catch (Exception e) {
            System.err.println("Web scraping timed out for game: " + gameUrl);
            juego = new Juego();
            juego.setName(gameUrl);
            juego.setURL(null);
            JuegoRepository.save(juego);
            return ResponseEntity.ok(juego); // Indicate no image found (or consider returning a specific error code)

        }
    }

    @GetMapping("/ToDo")
    public ResponseEntity<List<Juego>> getGamesWithNullUrl() {
        Iterable<Juego> juegos = JuegoRepository.findAll();
        List<Juego> juegosWithNullUrl = new ArrayList<>();
        for (Juego juego : juegos) {
            if (juego.getURL() == null) {
                juegosWithNullUrl.add(juego);
            }
        }
        return ResponseEntity.ok(juegosWithNullUrl);
    }

    @PutMapping("/actualizarImagen")
    public ResponseEntity<Juego> updateGameUrl(@RequestBody Juego juego) {
        Juego juegoAux = JuegoRepository.findById(juego.getName()).orElse(null);
        if (juegoAux != null) {
            juegoAux.setURL(juego.getURL());
            JuegoRepository.save(juegoAux);
            return ResponseEntity.ok(juegoAux);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{gameUrl}")
    public ResponseEntity<Void> deleteGame(@PathVariable String gameUrl) {
        JuegoRepository.deleteById(gameUrl);
        return ResponseEntity.noContent().build();
    }
}
