import * as codeController from '../../controllers/code.controller';
import * as codeService from '../../services/code.service';
import { Request, Response } from 'express';

jest.mock('../../services/code.service');

describe('code.controller', () => {
    describe('getCode', () => {
       it('should return a code and return 200 on success', async () => {
              // Arrange
              const req = {} as Request;
              const res = {
                status: jest.fn(() => res),
                send: jest.fn()
              } as unknown as Response;
              (codeService.getCode as jest.Mock).mockResolvedValue('1234');

              // Act
              await codeController.getCode(req, res);

              // Assert
              expect(res.status).toHaveBeenCalledWith(200);
              expect(res.send).toHaveBeenCalledWith('1234');
       });
    });

    describe('connectCode', () => {
        it('should connect code and return 200 on success', async () => {
            // Arrange
            const req = {
                body: { code: '1234' }
            } as unknown as Request;
            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            } as unknown as Response;
            (codeService.connectCode as jest.Mock).mockResolvedValue('Connected');

            // Act
            await codeController.connectCode(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Connected');
        });

        it('should return 500 and code not found if the response is null', async () => {  // <-- Note the async here
            // Arrange
            const req = {
                body: { code: '1234' }
            } as unknown as Request;
            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            } as unknown as Response;
            (codeService.connectCode as jest.Mock).mockResolvedValue(null);

            // Act
            await codeController.connectCode(req, res);  // <-- Note the await here

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith("The connection could not be made, please check your code and try again.");
        });
    });
});
