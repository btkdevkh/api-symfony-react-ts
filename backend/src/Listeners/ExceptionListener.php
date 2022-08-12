<?php

declare(strict_types=1);

namespace App\Listeners;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExceptionListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [ExceptionEvent::class => ['formatException', -127]];
    }

    public function formatException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $response = new JsonResponse();

        $response->setData([
            'message' => $exception->getMessage(),
        ]);

        $event->setResponse($response);
    }
}