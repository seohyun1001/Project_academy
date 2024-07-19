package org.zerock.project_academy.security.exception;

import lombok.Getter;

@Getter
public class AccessTokenException extends RuntimeException {

    public enum TOKEN_ERROR {
        EXPIRED, MALFORM, BADSIGN, UNACCEPT
    }

    private final TOKEN_ERROR tokenError;

    public AccessTokenException(TOKEN_ERROR tokenError) {
        super(tokenError.name());
        this.tokenError = tokenError;
    }
}
