import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';

describe('#LikeWidgetComponent', () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // declarations: [LikeWidgetComponent],
            // providers: [UniqueIdService],
            // imports: [FontAwesomeModule]
            /*visto que tudo que foi declarado e importado acima ja é feito no LikeWidgetModule é mais simples só importar o module
             isso também varia de acordo com a abordagem do grupo, supondo que o LikeWidgetModule
             tem muito mais imports/declarations/imports que não são usados nesse componente então não valeria a pena.*/
            imports: [LikeWidgetModule],
        }).compileComponents();
        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    });


    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        fixture.detectChanges();
        expect(component.id).toBeTruthy();
    });

    it('should NOT auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        const someId = 'someId';
        component.id = someId;
        fixture.detectChanges();
        expect(component.id).toBe(someId);
    });

    /*A função 'it', quando recebe um parâmetro geralmente chamado 'done', esse parâmetro é uma referêmncia
    para uma função que sinaliza para o teste que ele terminou.É importante que o desenvolvedor chame a função 'done'
    no momento em que achar adequado, caso contrário o teste nunca terminará e um erro de timeout será disparado.*/
    
    /*Utilizar o done no lugar de () é util quando tiver uma função assincrona, assim você tem certeza que ela
    foi chamada, como no exemplo abaixo, declare o done, e chame a função done() dentro da função assincrona depois do expect,
    se a função assincrona não for chamada o teste vai dar erro ja que o done() não vai ser chamado.
    OBS: sem o done o teste não acusaria erro, só um aviso que pode acabar passando despercebido.*/
    it(`#like should trigger (@Output liked) when called`, done => {
        fixture.detectChanges();
        component.liked.subscribe(() => {
            expect(true).toBeTrue();
            done();
        }) 
        component.like();
    });

    // OU
    it(`should trigger emission when called`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();
        expect(component.liked.emit).toHaveBeenCalled();
    });


});