<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Movie;
use App\Form\MovieType;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/movie", name="api_movie_")
 */
class MovieCrudController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"}, name="list")
     *
     * @param MovieRepository $movieRepository
     * @return JsonResponse
     */
    public function list(MovieRepository $movieRepository): JsonResponse
    {
        $movies = $movieRepository->findAll();

        $output = array_map(
            fn (Movie $movie) => $movie->exportForList(),
            $movies
        );

        return $this->json($output);
    }

    /**
     * @Route("/{id}", methods={"GET"}, name="show")
     * @param Movie $movie
     * @return JsonResponse
     */
    public function show(Movie $movie): JsonResponse
    {
        return $this->json($movie->exportForShow());
    }

    /**
     * @Route("/", methods={"POST"}, name="create")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $form = $this->createForm(MovieType::class, new Movie());

        $data = $this->getRequestData($request);

        $form->submit($data);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->json(['message' => 'Validation errors'], 400);
        }

        /** @var Movie $movie */
        $movie = $form->getData();

        $entityManager->persist($movie);
        $entityManager->flush();

        return $this->json($movie->exportForShow());
    }

    /**
     * @Route("/{id}", methods={"PUT"})
     *
     * @param Movie $movie
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    public function update(Movie $movie, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $form = $this->createForm(MovieType::class, $movie);

        $data = $this->getRequestData($request);

        $form->submit($data);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->json(['message' => 'Validation errors'], 400);
        }

        $entityManager->flush();

        return $this->json($movie->exportForShow());
    }

    /**
     * @Route("/{id}", methods={"DELETE"}, name="delete")
     *
     * @param Movie $movie
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    public function delete(Movie $movie, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($movie);
        $entityManager->flush();

        return $this->json(['message' => 'Done']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function getRequestData(Request $request): array
    {
        $content = $request->getContent();

        if (!$content) {
            return [];
        }

        $data = json_decode($content, true);

        if (!$data) {
            return [];
        }

        return $data;
    }

}