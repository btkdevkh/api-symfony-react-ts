<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=MovieRepository::class)
 */
class Movie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull()
     */
    private string $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull()
     */
    private string $director;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private ?DateTime $releaseDate = null;

    /**
     * @ORM\Column(type="boolean")
     */
    private bool $isFavorite = false;

    public function exportForList(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'director' => $this->director,
            'releaseDate' => $this->releaseDate ? $this->releaseDate->format('Y-m-d') : null,
            'isFavorite' => $this->isFavorite,
        ];
    }

    public function exportForShow(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'director' => $this->director,
            'releaseDate' => $this->releaseDate ? $this->releaseDate->format('Y-m-d') : null,
            'isFavorite' => $this->isFavorite,
        ];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDirector(): ?string
    {
        return $this->director;
    }

    public function setDirector(string $director): self
    {
        $this->director = $director;

        return $this;
    }

    public function getReleaseDate(): ?DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(?DateTimeInterface $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getIsFavorite(): ?bool
    {
        return $this->isFavorite;
    }

    public function setIsFavorite(bool $isFavorite): self
    {
        $this->isFavorite = $isFavorite;

        return $this;
    }
}
